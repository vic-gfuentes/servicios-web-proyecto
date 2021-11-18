using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Context;
using servicios_web_proyecto.DAO;
using servicios_web_proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace servicios_web_proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PortsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/<PortsController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(_context.Ports.Include(a => a.Airline).AsNoTracking().ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<PortsController>/5
        [HttpGet("{id}", Name = "GetPort")]
        public ActionResult Get(string id)
        {
            try
            {
                var port = _context.Ports.Include(a => a.Airline).AsNoTracking().First(ct => ct.PortId == id);
                return Ok(port);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<PortsController>
        [HttpPost("{prefix?}")]
        public ActionResult Post([FromBody] PortDAO portDAO, [FromRoute] string prefix = "CT")
        {
            try
            {
                var port = new Port();
                var airline = _context.Airlines.Single(item => item.AirlineId == portDAO.AirlineId);
                var consecutive = _context.Consecutives.Single(consec => consec.Prefix == prefix);

                port.PortId = consecutive.GetConsecutiveCode();
                port.Number = portDAO.Number;
                port.Available = portDAO.Available;
                port.Type = (Models.Attributes.PortType)portDAO.Type;
                port.Airline = airline;

                _context.Ports.Add(port);
                _context.SaveChanges();
                Binnacle.LogRecord(_context, "add", portDAO);

                return CreatedAtRoute("GetPort", new { id = port.PortId }, port);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<PortsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] PortDAO portDAO)
        {
            try
            {
                if (portDAO.PortId == id)
                {
                    var port = _context.Ports.Single(item => item.PortId == portDAO.PortId);
                    var airline = _context.Airlines.Single(item => item.AirlineId == portDAO.AirlineId);

                    port.Number = portDAO.Number;
                    port.Available = portDAO.Available;
                    port.Type = (Models.Attributes.PortType)portDAO.Type;
                    port.Airline = airline;

                    _context.Entry(port).State = EntityState.Modified;
                    _context.SaveChanges();
                    Binnacle.LogRecord(_context, "update", portDAO);

                    return CreatedAtRoute("GetPort", new { id = port.PortId }, port);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<PortsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                var port = _context.Ports.First(ct => ct.PortId == id);
                if (port != null)
                {
                    _context.Ports.Remove(port);
                    _context.SaveChanges();
                    Binnacle.LogRecord(_context, "delete", port);

                    return Ok(port);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
